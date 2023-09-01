import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'package:sqflite_common_ffi/sqflite_ffi.dart';
import 'dart:convert';
import '../../model/note/note.dart';

class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._init();

  static Database? _database;

  DatabaseHelper._init();

  Future<Database> get database async {
    if (_database != null) return _database!;

    _database = await _initDB('notes.db');
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final path = await getDatabasesPath();
    final dbPath = join("/Users/joeyclapton/dev/puc/plf-es-2023-1-ti5-5104100-race-engineering/codigo/mobile/", filePath);
    print(path);
    // Inicializar o sqflite_common_ffi
    sqfliteFfiInit();

    return await openDatabase(dbPath, version: 1, onCreate: _createDB);
  }


  Future<void> _createDB(Database db, int version) async {
    final idType = 'TEXT PRIMARY KEY';
    final textType = 'TEXT NOT NULL';
    final colorType = 'INTEGER NOT NULL';

    await db.execute('''
      CREATE TABLE IF NOT EXISTS notes (
        id $idType,
        title $textType,
        description $textType,
        color $colorType
      )
    ''');
  }

  create(Note note) async {
    final db = await instance.database;
    final id = await db.insert('notes', note.toMap());

    print(note.toString());
  }

  Future<Note> read(String id) async {
    final db = await instance.database;
    final maps = await db.query(
      'notes',
      columns: null,
      where: 'id = ?',
      whereArgs: [id],
    );

    if (maps.isNotEmpty) {
      return Note.fromMap(maps.first);
    } else {
      throw Exception('Note not found!');
    }
  }

  Future<List<Note>> readAll() async {
    final db = await instance.database;
    // final orderBy = 'id DESC';
    // final maps = await db.query('notes', orderBy: orderBy);
    final maps = await db.query('notes');
    return maps.map((map) => Note.fromMap(map)).toList();
  }

  Future<void> update(Note note) async {
    final db = await instance.database;
    await db.update(
      'notes',
      note.toMap(),
      where: 'id = ?',
      whereArgs: [note.id],
    );
  }

  Future<void> delete(String id) async {
    final db = await instance.database;
    await db.delete(
      'notes',
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  Future<void> close() async {
    final db = await instance.database;
    db.close();
  }
}
